async function getData(){
    try{
        const res = await fetch('https://wi-func-node-a8cwfmd2f4g0b2cs.australiaeast-01.azurewebsites.net/api/getData')
        const data = await res.json()
        return data
    }
    catch (err) {
        console.error('API 호출 에러:', err);
        return null;
    }
}
const data =getData().then(data => {
    console.log(data.data)
    return data.data
}).then(data => {
    return data.map(item => {
        return {
            id: item.id,
            title: item.title,
            isPublic: item.isPublic,
            no: item.no,
            variation: item.variation,
            description: item.description,
            longDescription: item.longDescription,
            actualTitle: item.actualTitle,
        }
    })
}).then(data => {
    console.log(data);
    renderData(data);
});

function renderData(data) {
    const grid = document.querySelector('.grid.section-content');
    
    console.log(data);
    data.forEach(item => {
        const card = document.createElement('div');
        card.dataset.title = item.title;
        card.dataset.actualTitle = item.actualTitle;
        card.dataset.longDescription = item.longDescription;
        card.dataset.variation = JSON.stringify(item.variation);
        card.classList.add('print-card');
        card.innerHTML = `
        <img src="https://westernimpressionsart.blob.core.windows.net/artworks/${item.title.toLowerCase()}-lino.jpg" alt="${item.title}">
        <h3>${item.actualTitle}</h3>
        <p>${item.description}</p>`;
        grid.appendChild(card);
        modalAdder(card);
    });
}

function modalAdder (card) {
    card.addEventListener('click', () => {
     console.log(card);
     console.log(card.dataset.title);
      const title = card.dataset.title;
      const actualTitle = card.dataset.actualTitle;
      const longDescription = card.dataset.longDescription;
      const formatLongDescription = longDescription
      ? longDescription.replace(/\.\s*/g, '.<br/>')
      : '';
      const variation = JSON.parse(card.dataset.variation);
      variation.map(variationItem => {
        return `<img src="https://westernimpressionsart.blob.core.windows.net/artworks/${title.toLowerCase()}-${variationItem.toLowerCase()}.jpg" alt="${variationItem}"  />`
      })
      const modal = document.createElement('div');
      modal.classList.add('modal');
      modal.innerHTML = `
        <div class="modal-content">
        <div class ="modal-image-container">
          <div class="modal-left">
            <img class= "main-image" src="https://westernimpressionsart.blob.core.windows.net/artworks/${title.toLowerCase()}-lino.jpg" alt="${title}"  />
          </div>
          <div class="modal-right">
            <div class="modal-variation-thumbnails">
            ${variation.map(variationItem => {
              return `<img class="thumb" src="https://westernimpressionsart.blob.core.windows.net/artworks/${title.toLowerCase()}-${variationItem.toLowerCase()}.jpg" alt="${variationItem}" />`
            }).join('')}
            </div>
          </div>
          </div>
          <div class="modal-text-body">
            <button class="modal-close">×</button>
            <div class="modal-section-content">
            <h2>${actualTitle}</h2>            
            <p>${formatLongDescription}</p>
            <a href="mailto:wi@westernimpressions.com?subject=Order%20Request:%20${encodeURIComponent(title)}" class="btn secondary">Email to Order</a>
          
            </div>
            </div>
        </div>
      `;

      const thumbnails = modal.querySelectorAll('.thumb');
      thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            if(thumb.src.includes('lino')){
              mainImage.src = thumb.src;
              thumb.src = `https://westernimpressionsart.blob.core.windows.net/artworks/${title.toLowerCase()}-lino.jpg`
              const modalContentDiv = document.querySelector('.modal-content');
              modalContentDiv.innerHTML = `
                    <div class="modal-content">
                    <div class ="modal-image-container">
                    <div class="modal-left">
                        <img class= "main-image" src="https://westernimpressionsart.blob.core.windows.net/artworks/${title.toLowerCase()}-lino.jpg" alt="${title}"  />
                    </div>
                    <div class="modal-right">
                        <div class="modal-variation-thumbnails">
                        ${variation.map(variationItem => {
                        return `<img class="thumb" src="https://westernimpressionsart.blob.core.windows.net/artworks/${title.toLowerCase()}-${variationItem.toLowerCase()}.jpg" alt="${variationItem}" />`
                        }).join('')}
                        </div>
                    </div>
                    </div>
                    <div class="modal-text-body">
                        <button class="modal-close">×</button>
                        <div class="modal-section-content">
                        <h2>${actualTitle}</h2>            
                        <p>${formatLongDescription}</p>
                        <a href="mailto:wi@westernimpressions.com?subject=Order%20Request:%20${encodeURIComponent(title)}" class="btn secondary">Email to Order</a>
                    
                        </div>
                        </div>
                    </div>
                `
            }
            else{
              mainImage.src = thumb.src;
              thumb.src = `https://westernimpressionsart.blob.core.windows.net/artworks/${title.toLowerCase()}-lino.jpg`
            }
        });
      });

      document.body.appendChild(modal);

      modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
      });
    });
  };

//   function modalThumbChanger() {
//     const modalThumbnails = document.querySelectorAll('.thumb');
//     const mainImage = document.querySelector('.main-image');

//     modalThumbnails.forEach(thumb => {
//         thumb.addEventListener('click', () => {
//             if(thumb.src.includes('lino')){
//                 mainImage.src = thumb.src;
//                 thumb.src = `https://westernimpressionsart.blob.core.windows.net/artworks/${title.toLowerCase()}-lino.jpg`
//             }
//         });
//     });
//     }
