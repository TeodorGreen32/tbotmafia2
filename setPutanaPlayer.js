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
exports.setPutanaPlayer = void 0;
const telegraf_1 = require("telegraf");
const setManiacPlayer_1 = require("./setManiacPlayer");
const StartGame_1 = require("./StartGame");
const setPutanaPlayer = (bot, ctx, countPlayer) => __awaiter(void 0, void 0, void 0, function* () {
    function sendPutanaToServer(ctx, putanaYes) {
        fetch(`https://greenz.site/setCountPlayer.php?nameUser=${ctx.from.username}&putanaYes=${putanaYes}`).then(response => (response.text())).then((data) => __awaiter(this, void 0, void 0, function* () {
            console.log("sendPutana");
            let countPlayerThisFloor = yield JSON.parse(data).countPlayer;
            if (countPlayerThisFloor > 7) {
                (0, setManiacPlayer_1.setManiacPlayer)(bot, ctx, countPlayerThisFloor);
            }
            else {
                (0, StartGame_1.StartGame)(ctx, bot);
            }
        }));
    }
    if (countPlayer > 5) {
        yield ctx.replyWithHTML("<b> Включить роль путаны ?  </b>", telegraf_1.Markup.inlineKeyboard([[
                telegraf_1.Markup.button.callback("Да", "PutanaYes"), telegraf_1.Markup.button.callback('Нет', "PutanaNo")
            ]]));
        bot.action("PutanaYes", (ctx) => {
            ctx.answerCbQuery();
            sendPutanaToServer(ctx, true);
        });
        bot.action("PutanaNo", (ctx) => {
            ctx.answerCbQuery();
            sendPutanaToServer(ctx, false);
        });
    }
    else {
        (0, StartGame_1.StartGame)(ctx, bot);
    }
});
exports.setPutanaPlayer = setPutanaPlayer;
