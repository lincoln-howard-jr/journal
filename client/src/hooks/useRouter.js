import {useState} from 'react';
import base from '../lib/base';
import {scrollToTop} from '../lib/scrolling';

export default function useRouter () {
  // router section
  let initialPage = new URLSearchParams (window.location.search).get ('page') || 'write';
  const [page, setPage] = useState (initialPage);
  const [params, setParams] = useState (new URLSearchParams (window.location.search));
  const redirect = (url) => {
    let arr = url.split ('?');
    let nextPage = arr.length > 1 ? new URLSearchParams (`?${arr [1]}`).get ('page') : 'write';
    window.history.pushState ({previous: page, next: nextPage}, 'Journal', `${base}${url}`)
    setPage (nextPage);
    if (arr.length > 1) setParams (new URLSearchParams (`?${arr [1]}`));
    scrollToTop (100);
  }

  return {page, params, redirect};

}