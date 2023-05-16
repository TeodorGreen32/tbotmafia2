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
exports.cleanChat = exports.bot = void 0;
const StartGame_1 = require("./StartGame");
const telegraf_1 = require("telegraf");
const setCountPlayer_1 = require("./setCountPlayer");
const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
require('dotenv').config();
exports.bot = new Telegraf(process.env.BOT_TOKEN);
function cleanChat(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        let i = 1;
        while (true) {
            try {
                yield ctx.deleteMessage(ctx.message.message_id - i++);
            }
            catch (e) {
                break;
            }
        }
    });
}
exports.cleanChat = cleanChat;
exports.bot.start((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield cleanChat(ctx);
        yield ctx.replyWithPhoto({ source: "./assets/img/MainBg.jfif" });
        yield ctx.replyWithHTML("Привет ,<b>" + ctx.message.from.first_name + "</b> . Я новый бот для игры в мафию. Очень рад видеть тебя! \n\n<b>Чтобы начать играть нажми /game</b>");
    }
    catch (error) {
        ctx.replayWithHTML(error);
    }
}));
exports.bot.command('game', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        cleanChat(ctx);
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
exports.bot.hears("Начать игру", (ctx) => {
    (0, StartGame_1.StartGame)(ctx, exports.bot);
});
(0, setCountPlayer_1.setCountPlayer)(exports.bot);
exports.bot.launch();
// Enable graceful stop
process.once('SIGINT', () => exports.bot.stop('SIGINT'));
process.once('SIGTERM', () => exports.bot.stop('SIGTERM'));
