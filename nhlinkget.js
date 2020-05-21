// returns new line separated string of links to all NH images on the page
(()=>{
    var links=[...document.querySelectorAll(".thumb-container img")].map((x)=>{
        return thumbnailToFullLink(x.src);
    });

    return links.join("\n");
})()

// return full link given thumbnail link
function thumbnailToFullLink(url)
{
    // match1=gallery id
    // match2=image count
    var match=url.match(/nhentai\.net\/galleries\/(\d+)\/(\d+)t/);

    if (!match)
    {
        return "error";
    }

    return `https://i.nhentai.net/galleries/${match[1]}/${match[2]}.jpg`;
}