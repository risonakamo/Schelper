/*when executed on a px post page, returns an array of urls that correspond to cache
  images of the post page, which should then be opened in new tabs to initate the cache.
  If the post is a singular post, the cache is done in the tab itself, and no urls are
  returned.

  if the variable openSource is true in the context, needs to be set by executeScript,
  the returned array will contain source image urls instead*/
(()=>{
    var postId=parseInt(window.location.href.match(/illust_id=(\d+)/)[1]);
    var imageCount=document.querySelector(".fxJxdG"); //select the image count

    //if the post is a multi image post (MGA page)
    if (imageCount)
    {
        imageCount=parseInt(imageCount.innerText.match(/\/(\d+)/)[1]);

        //if set to open source images instead, divert to opensourceimgs function
        if (openSource)
        {
            return openSourceImgs(postId,imageCount);
        }

        var res=[];
        for (var x=0;x<imageCount;x++)
        {
            res.push(`https://www.pixiv.net/member_illust.php?mode=manga_big&illust_id=${postId}&page=${x}`);
        }
    }

    else
    {
        if (openSource)
        {
            return openSourceImgs(postId);
        }

        //select the image itself and click it, which opens up
        //the larger version of the image to cache it:
        document.querySelector(".gEgPvm").click();
        return [];
    }

    return res;
})();

//give post id and number of images, returns array of src image urls to open in new tab
//from executeScript that should be calling this script
function openSourceImgs(postId,imageCount=1)
{
    var res=[];
    //get the slash ID and image extension
    var imageSlashId=document.querySelector(".eaPhLD").src.match(/img\/(.*)\/\d+_.*(\..*)/);
    var imageExtension=imageSlashId[2];
    imageSlashId=imageSlashId[1];

    for (var x=0;x<imageCount;x++)
    {
        res.push(`https://i.pximg.net/img-original/img/${imageSlashId}/${postId}_p${x}${imageExtension}`);
    }

    return res;
}