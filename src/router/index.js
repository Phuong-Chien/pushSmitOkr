import { createRouter, createWebHashHistory } from "vue-router";

import Okr from "../pages/okr.vue";
import Checkin from "../pages/check-in.vue";
import Feedback from "../pages/feedback.vue";
import Job from "../pages/job.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: Okr,
    },
    {
      path: "/check-in",
      component: Checkin,
    },
    {
      path: "/feedback",
      component: Feedback,
    },
    {
      path: "/job",
      component: Job,
    },
  ],
});

export default router;
