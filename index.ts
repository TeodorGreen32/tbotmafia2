"use strict";

import { Markup } from "telegraf";
import { setCountPlayer } from "./setCountPlayer";
const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
require('dotenv').config();
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(async (ctx:any)=>{
    try{
        await ctx.replyWithPhoto({source: "./assets/img/MainBg.jfif"})
        await ctx.replyWithHTML("Привет ,<b>" + ctx.message.from.first_name + "</b> . Я новый бот для игры в мафию. Очень рад видеть тебя! \n\n<b>Чтобы начать играть нажми /game</b>");
    }catch(error){
        ctx.replayWithHTML(error);
    }
    
});
bot.command('game',async(ctx:any)=>{
    try{
        await ctx.replyWithHTML("Выберите параметры для игры:",Markup.keyboard([
            [Markup.button.callback("Начать игру","test")],
            [Markup.button.callback("Количество игроков","test")],
            [Markup.button.callback("Правила","test")],
            [Markup.button.callback("Отмена","test")]
        ]));
    } catch(error){
        ctx.replyWithHTML(error);
    }
})
setCountPlayer(bot);

bot.launch();
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
