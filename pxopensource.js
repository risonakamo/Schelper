/*to be executed on px cache big image pages. navigates the big image page to the
  source image page. for singular big image pages, makes a new tab. */
(()=>{
    if (window.location.href.search(/mode=manga_big/)>=0)
    {
        window.location.href=document.querySelector("img").src;
    }

    else
    {
        window.open(document.querySelector("div[role=presentation]").firstChild.firstChild.firstChild.firstChild.src,"_blank");
    }
})();