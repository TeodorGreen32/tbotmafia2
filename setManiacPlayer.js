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
exports.setManiacPlayer = void 0;
const telegraf_1 = require("telegraf");
const StartGame_1 = require("./StartGame");
const setManiacPlayer = (bot, ctx, countPlayer) => __awaiter(void 0, void 0, void 0, function* () {
    function sendManiacToServer(ctx, maniacYes) {
        fetch(`https://greenz.site/setCountPlayer.php?nameUser=${ctx.from.username}&maniacYes=${maniacYes}`).then(response => (response.text())).then((data) => __awaiter(this, void 0, void 0, function* () {
            console.log("sendManiac");
            console.log(data);
            (0, StartGame_1.StartGame)(ctx, bot);
        }));
    }
    if (countPlayer > 7) {
        yield ctx.editMessageText("Включить роль маньяка ?", telegraf_1.Markup.inlineKeyboard([[
                telegraf_1.Markup.button.callback("Да", "ManiacYes"), telegraf_1.Markup.button.callback('Нет', "ManiacNo")
            ]]));
        bot.action("ManiacYes", (ctx) => {
            ctx.answerCbQuery();
            sendManiacToServer(ctx, true);
        });
        bot.action("ManiacNo", (ctx) => {
            ctx.answerCbQuery();
            sendManiacToServer(ctx, false);
        });
    }
    else {
        (0, StartGame_1.StartGame)(ctx, bot);
    }
});
exports.setManiacPlayer = setManiacPlayer;
