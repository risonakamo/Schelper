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
    // match3=png or jpg
    var match=url.match(/nhentai\.net\/galleries\/(\d+)\/(\d+)t\.(\w+)/);

    if (!match)
    {
        return "error";
    }

    return `https://i.nhentai.net/galleries/${match[1]}/${match[2]}.${match[3]}`;
}