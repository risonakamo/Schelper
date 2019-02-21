//enables loop and pauses the first video element on the page
//intended for file pages opening to a file which has a single video element.
var player=document.querySelector("video");

if (player)
{
    player.loop=true;
    player.pause();
}