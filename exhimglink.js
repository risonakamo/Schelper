(()=>{
    var downloadLink=document.querySelector("#i7");

    if (downloadLink.children.length)
    {
        downloadLink=downloadLink.children[1].href;
    }

    else
    {
        downloadLink=document.querySelector("#img").src;
    }

    window.location.href=downloadLink;
})()