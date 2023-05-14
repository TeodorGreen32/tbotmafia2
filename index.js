"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const setCountPlayer_1 = require("./setCountPlayer");
const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
require('dotenv').config();
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ctx.replyWithPhoto({ source: "./assets/img/MainBg.jfif" });
        yield ctx.replyWithHTML("Привет ,<b>" + ctx.message.from.first_name + "</b> . Я новый бот для игры в мафию. Очень рад видеть тебя! \n\n<b>Чтобы начать играть нажми /game</b>");
    }
    catch (error) {
        ctx.replayWithHTML(error);
    }
}));
bot.command('game', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ctx.replyWithHTML("Выберите параметры для игры:", telegraf_1.Markup.keyboard([
            [telegraf_1.Markup.button.callback("Начать игру", "test")],
            [telegraf_1.Markup.button.callback("Количество игроков", "test")],
            [telegraf_1.Markup.button.callback("Правила", "test")],
            [telegraf_1.Markup.button.callback("Отмена", "test")]
        ]));
    }
    catch (error) {
        ctx.replyWithHTML(error);
    }
}));
(0, setCountPlayer_1.setCountPlayer)(bot);
bot.launch();
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
