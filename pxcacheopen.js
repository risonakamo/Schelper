/*when executed on a px post page, returns an array of urls that correspond to cache
  images of the post page, which should then be opened in new tabs to initate the cache.
  If the post is a singular post, the cache is done in the tab itself, and no urls are
  returned*/
(()=>{
    var postId=parseInt(window.location.href.match(/illust_id=(\d+)/)[1]);
    var imageCount=document.querySelector(".fxJxdG"); //select the image count

    //if the post is a multi image post (MGA page)
    if (imageCount)
    {
        imageCount=parseInt(imageCount.innerText.match(/\/(\d+)/)[1]);

        var res=[];
        for (var x=0;x<imageCount;x++)
        {
            res.push(`https://www.pixiv.net/member_illust.php?mode=manga_big&illust_id=${postId}&page=${x}`);
        }
    }

    else
    {
        //select the image itself and click it, which opens up
        //the larger version of the image to cache it:
        document.querySelector(".gEgPvm").click();
        return [];
    }

    return res;
})();