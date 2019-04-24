(()=>{
    var downloadLink=document.querySelector("#i7");

    if (downloadLink.children.length)
    {
        return downloadLink.children[1].href;
    }

    return document.querySelector("#img").src;
})()