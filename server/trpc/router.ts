import { initTRPC } from "@trpc/server";
import { z } from "zod";
const t = initTRPC.create();
export const appRouter = t.router({
  getQuestions: t.procedure.input(z.object({ tenant: z.string() })).query(async () => [
    { id:"1", label:"What is your primary weight loss goal?", type:"select", options:["10-20 lbs","20-50 lbs","50+ lbs","Maintain"] },
    { id:"2", label:"Current height & weight", type:"bmi" },
    { id:"3", label:"Medical conditions", type:"checkbox", options:["Diabetes","Hypertension","Thyroid","PCOS"] },
  ]),
  createSubmission: t.procedure.input(z.object({ tenant: z.string(), data: z.any() })).mutation(async ({input}) => ({ success:true,...input })),
  getSubmissions: t.procedure.query(async () => []),
});
export type AppRouter = typeof appRouter;
