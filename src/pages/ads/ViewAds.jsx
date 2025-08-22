import { useDispatch, useSelector } from "react-redux";
import Translation from "../../components/common/translation/Translation";
import DashboardTable from "../../components/common/table/ReusableTable";
import Cimg from "../../components/common/image/Cimg";
import SectionLayout from "../../components/layout/section/SectionLayout";
import { routes } from "../../routes/routes";
import { useLocation } from "react-router-dom";
import { approveAd, deleteAd } from "../../services/adServices";
import CButton from "../../components/common/button/CButton";
import { useState } from "react";
import { getAllAdsActions } from "../../redux/actions/adActions";

export default function ViewAds() {
  const { pendingAds, approvedAds } = useSelector((state) => state.ads);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const approveHandler = async (id) => {
    try {
      setIsLoading(true);
      await approveAd(id);
      dispatch(getAllAdsActions());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  const isPendingPath = routes.pAds === pathname;
  const columns = [
    {
      id: "title", // مفتاح عام، نستخدمه فقط كمعرف
      label: "Title",
      render: (item) => {
        return item.title;
      }, // عرض الاسم حسب اللغة
    },
    {
      id: "image",
      label: "Image",
      render: (item) =>
        item.images ? (
          <Cimg
            src={item.images[0]}
            alt="media"
            style={{ width: 50, height: 50, borderRadius: 5 }}
          />
        ) : (
          "-"
        ),
    },
    {
      id: "posted-By", // مفتاح عام، نستخدمه فقط كمعرف
      label: "posted-by",
      render: (item) => {
        return item.user?.name;
      }, // عرض الاسم حسب اللغة
    },
    {
      id: "category", // مفتاح عام، نستخدمه فقط كمعرف
      label: "category",
      render: (item) => {
        return <Translation object={item.category} path="name" />;
      }, // عرض الاسم حسب اللغة
    },
    {
      id: "sub_category", // مفتاح عام، نستخدمه فقط كمعرف
      label: "sub_category",
      render: (item) => {
        return <Translation object={item.sub_category} path="name" />;
      }, // عرض الاسم حسب اللغة
    },
    {
      id: "view", // مفتاح عام، نستخدمه فقط كمعرف
      label: "view",
      render: (item) => {
        return <CButton variant="outlined" label="view" />;
      }, // عرض الاسم حسب اللغة
    },
    {
      id: "approve", // مفتاح عام، نستخدمه فقط كمعرف
      label: "",
      render: (item) => {
        return isPendingPath ? (
          <CButton
            label="approve"
            color="info"
            variant="contained"
            onClick={() => approveHandler(item._id)}
            disabled={isLoading}
          />
        ) : (
          <></>
        );
      }, // عرض الاسم حسب اللغة
    },
  ];

  return (
    <SectionLayout title={isPendingPath ? "pendingAds" : "approvedAds"}>
      <DashboardTable
        data={isPendingPath ? pendingAds : approvedAds}
        columns={columns}
        onDelete={deleteAd}
        // addPath={routes.addCategory}
      />
    </SectionLayout>
  );
}
