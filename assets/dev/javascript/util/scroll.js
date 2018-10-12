export const noScroll = () => {
  const scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
  $(document).on(scroll_event, function (e) {
    e.preventDefault();
  });
  //SP
  $(document).on('touchmove.noScroll', function (e) {
    e.preventDefault();
  });
}

export const returnScroll = () => {
  const scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
  $(document).off(scroll_event);
  //SP
  $(document).off('.noScroll');
}

