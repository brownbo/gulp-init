export const initNormalSwiper = (id) => {
  const init = () => {
    let swiper = new Swiper(id, {
      watchOverflow: true,
      lazy: {
        loadPrevNext: true,
      },
      pagination: {
        el: '.swiper-pagination'
      }
    })
  }

  $(window).resize(init)
  setTimeout(init)
}

export const initCenterSwiper = (id, btnList) => {
  let swiper = new Swiper(id, {
    slidesPerView: "auto",
    navigation: {
      nextEl: btnList[1],
      prevEl: btnList[0],
    }
  })
}


export const initMutipleSwiper = (id) => {
  let swiper = new Swiper(id, {
    slidesPerView: 3,
    spaceBetween: 10,
  })
}

export const initFreeSwiper = (id) => {
  let swiper = new Swiper(id, {
    slidesPerView: 'auto',
    spaceBetween: 10
  })
}

export const initCoverSwiper = (id) => {
  let swiper = new Swiper(id, {
    freeMode: true,
    lazy: {
      loadPrevNext: true
    },
    slidesPerView: 'auto',
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    observer: true,
    observeParents: true
  })
}