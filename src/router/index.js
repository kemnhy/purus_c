import { createRouter, createWebHistory } from "vue-router";
import Estimate from "@/views/Estimate.vue";

import Reser_check from "@/views/Reser_check.vue";
import Estimate_02 from "@/views/Estimate_02.vue";
import Estimate_03 from "@/views/Estimate_03.vue";
import Review from "@/views/Review.vue";
import Home from "@/views/Home.vue";
import Side_menu from "@/components/Side_menu.vue";
import LoginAdmin from "@/pages/admin/LoginAdmin.vue";
import AdminHome from "@/pages/admin/AdminHome.vue";
import DashboardAdmin from "@/pages/admin/DashboardAdmin.vue";
import CustomerReview from "@/pages/admin/CustomerReview.vue";
import NewWorker from "@/pages/admin/NewWorker.vue";
import Notice from "@/pages/admin/Notice.vue";
import Reservation from "@/pages/admin/Reservation.vue";
import ReservationList from "@/pages/admin/ReservationList.vue";
import Result from "@/pages/admin/Result.vue";
import WorkerList from "@/pages/admin/WorkerList.vue";
import LoginWorker from "@/pages/worker/LoginWorker.vue";
import DashboardWorker from "@/pages/worker/DashboardWorker.vue";
import WorkerHome from "@/pages/worker/WorkerHome.vue";
import ReservationDetail from "@/pages/worker/ReservationDetail.vue";
import CustomerSign from "@/pages/worker/CustomerSign.vue";
import Complete from "@/pages/worker/Complete.vue";
import DetailComplete from "@/pages/worker/DetailComplete.vue";
import MyPage from "@/pages/worker/MyPage.vue";
import EditInfo from "@/pages/worker/EditInfo.vue";
import Month from "@/pages/worker/Month.vue";
import FindAccount from "@/pages/worker/FindAccount.vue";


const routes = [
  { path: "/", component: Home },
  { path: "/side_menu", component: Side_menu, name: Side_menu },
  { path: "/estimate", component: Estimate },
  { path: "/estimate02", component: Estimate_02 },
  { path: "/estimate03", component: Estimate_03 },
  { path: "/reser_check", component: Reser_check },
  { path: "/review", component: Review },
  // 관리자 페이지
  {path : "/admin", component: LoginAdmin, name:"LoginAdmin"},
  {
    path: "/admin",
    component : AdminHome,
    redirect: "admin/dashboard",
    children: [
      {path: "dashboard", component: DashboardAdmin, name:"DashboardAdmin"},
      {path: "customerreview", component: CustomerReview, name:"CustomerReview"},
      {path: "newworker", component: NewWorker, name:"NewWorker"},
      {path: "notice", component: Notice, name:"Notice"},
      {path: "reservation", component: Reservation, name:"Reservation"},
      {path: "reservationlist", component: ReservationList, name:"ReservationList"},
      {path: "result", component: Result, name:"Result"},
      {path: "workerlist", component: WorkerList, name:"WorkerList"},
    ]
  },

  // 기사 페이지
  {path: "/worker", component: LoginWorker, name: "LoginWorker"},
  {
    path: "/worker/dashboard",
    component: DashboardWorker,
    redirect: "worker/dashboard/home",
    children: [
      {path:"home", component: WorkerHome, name: "WorkerHome"},
      {path:"reservationdetail", component: ReservationDetail, name: "ReservationDetail"},
      {path:"customersign", component: CustomerSign, name: "CustomerSign"},
      {path:"complete", component: Complete, name: "Complete"},
      {path:"detailcomplete", component: DetailComplete, name: "DetailComplete"},
      {path:"mypage", component: MyPage, name: "MyPage"},
      {path:"editinfo", component: EditInfo, name: "EditInfo"},
      {path:"month", component: Month, name: "Month"},
      {path:"findaccount", component: FindAccount, name: "FindAccount"},
    ]
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
