(()=>{
    //origina link is usually 3rd li
    var originalLinkLi=document.querySelector("#stats li:nth-of-type(3)");

    if (originalLinkLi.innerText.slice(0,8)=="Original")
    {
        return originalLinkLi.firstElementChild.href;
    }

    //if its not
    var allLis=document.querySelectorAll("#stats li");
    for (var x=0,l=allLis.length;x<l;x++)
    {
        if (allLis[x].innerText.slice(0,8)=="Original")
        {
            return allLis[x].firstElementChild.href;
        }
    }
})()