import { Markup } from "telegraf";
import { button } from "telegraf/typings/markup";
import { setManiacPlayer } from "./setManiacPlayer";
import { StartGame } from "./StartGame";

export const setPutanaPlayer = async (bot: any, ctx: any, countPlayer: number) => {
    function sendPutanaToServer(ctx:any, putanaYes:boolean){
        fetch(`https://greenz.site/setCountPlayer.php?nameUser=${ctx.from.username}&putanaYes=${putanaYes}`).then(response => (response.text())).then(async(data) => {
            console.log("sendPutana");
            let countPlayerThisFloor = await JSON.parse(data).countPlayer
            if(countPlayerThisFloor > 7){
                setManiacPlayer(bot,ctx,countPlayerThisFloor);
            }else{
                StartGame(ctx,bot)
            } 
        })
    }
    if (countPlayer > 5) {
        await ctx.replyWithHTML("<b> Включить роль путаны ?  </b>",
            Markup.inlineKeyboard([[
                Markup.button.callback("Да", "PutanaYes"), Markup.button.callback('Нет', "PutanaNo")
            ]])
        );
        bot.action("PutanaYes", (ctx: any) => {
            ctx.answerCbQuery();
            sendPutanaToServer(ctx,true);
        })
        bot.action("PutanaNo", (ctx: any) => {
            ctx.answerCbQuery();
            sendPutanaToServer(ctx,false);
        })
    }else{
        StartGame(ctx,bot)
    }

}