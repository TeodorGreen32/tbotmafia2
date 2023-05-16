import { Markup } from "telegraf";
import { button } from "telegraf/typings/markup";
import { setBlackPlayer } from "./setCountMafia";
import { cleanChat } from ".";

export const setCountPlayer = (bot:any)=>{
    bot.hears("Количество игроков",async (ctx:any)=>{
        await cleanChat(ctx);
        await ctx.replyWithHTML("<a href='https://t.me/MafiaNght_bot'>--- @MafiaNght_bot ---</a>",Markup.removeKeyboard())    
        await ctx.replyWithHTML('<b>Выберите количество игроков </b>',Markup.inlineKeyboard([
            [Markup.button.callback("4 игроков","setCountPlayer_4"),Markup.button.callback('5 игроков',"setCountPlayer_5")],
            [Markup.button.callback("6 игроков","setCountPlayer_6"),Markup.button.callback('7 игроков',"setCountPlayer_7")],
            [Markup.button.callback("8 игроков","setCountPlayer_8"),Markup.button.callback('9 игроков',"setCountPlayer_9")]
        ]))
    })
    async function setCountPlayer(ctx:any,countPlayer:number){
        await fetch(`https://greenz.site/setCountPlayer.php?nameUser=${ctx.from.username}&countPlayer=${countPlayer}`).then(response => (response.text())).then(data => {
        console.log("sendPlayer")
        })
        await ctx.answerCbQuery();
        await setBlackPlayer(ctx,countPlayer,bot);
    }
    
    
    bot.action('setCountPlayer_4', (ctx: any) => {
        setCountPlayer(ctx,4);
    })
    bot.action('setCountPlayer_5', (ctx: any) => {
        setCountPlayer(ctx,5);
    })
    bot.action('setCountPlayer_6', (ctx: any) => {
        setCountPlayer(ctx,6);
    })
    bot.action('setCountPlayer_7', (ctx: any) => {
        setCountPlayer(ctx,7);
    })
    bot.action('setCountPlayer_8', (ctx: any) => {
        setCountPlayer(ctx,8);
    })
    bot.action('setCountPlayer_9', (ctx: any) => {
        setCountPlayer(ctx,9);
    })
    
}



