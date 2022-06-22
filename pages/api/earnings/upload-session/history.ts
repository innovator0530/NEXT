import { adminOnlySession, RequestWithSession } from "@middleware/nextAuthApi";
import { NextApiResponse } from "next";
import { createHandler } from "../../../../middleware";
import Earning from "../../../../models/database/earnings"

const handler = createHandler();


// Admin Only:

handler.use(adminOnlySession).get(async (req: RequestWithSession, res: NextApiResponse) => {
    try {
        const earnings = await Earning.find({}, { time: 1, uploaded: 1 }).sort({ time: -1 });
        const months: { time: number, amount: number, uploaded: number }[] = [];
        for (let i = 0; i < earnings.length; i++) {
            const earning = { time: new Date(earnings[i].time).getTime(), uploaded: new Date(earnings[i].uploaded).getTime() };

            if (months.length < 1) {
                months.push({ time: earning.time, amount: 1, uploaded: earning.uploaded })
            }
            else {
                const currentMonth = months[months.length - 1];
                if (earning.time > (currentMonth.time - 86400000) && earning.time < (currentMonth.time + 86400000)) {
                    currentMonth.amount++;
                    if (earning.uploaded > currentMonth.uploaded) {
                        currentMonth.uploaded = earning.uploaded;
                    }
                }
                else {
                    months.push({ time: earning.time, amount: 1, uploaded: earning.uploaded })
                }
            }
        }

        res.status(200).json(months);
    } catch (e) {
        console.log("Error at earnings history", e);
        res.status(500).json({ message: e.message })
    }
})

export default handler;