import { Markup } from "telegraf";
import { button } from "telegraf/typings/markup";
import { StartGame } from "./StartGame";
export const setManiacPlayer = async (bot: any, ctx: any, countPlayer: number) =>{
    function sendManiacToServer(ctx:any,maniacYes:boolean){
        fetch(`https://greenz.site/setCountPlayer.php?nameUser=${ctx.from.username}&maniacYes=${maniacYes}`).then(response => (response.text())).then(async(data) => {
            console.log("sendManiac");
            console.log(data)
            StartGame(ctx,bot)
        })
    }
    if (countPlayer > 7) {
        await ctx.editMessageText("Включить роль маньяка ?",
            Markup.inlineKeyboard([[
                Markup.button.callback("Да", "ManiacYes"), Markup.button.callback('Нет', "ManiacNo")
            ]])
        );
        bot.action("ManiacYes", (ctx: any) => {
            ctx.answerCbQuery();
            sendManiacToServer(ctx,true);
        })
        bot.action("ManiacNo", (ctx: any) => {
            ctx.answerCbQuery();
            sendManiacToServer(ctx,false);
        })
    }else{
        StartGame(ctx,bot)
    }
}