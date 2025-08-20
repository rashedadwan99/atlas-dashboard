import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CForm from "../../components/common/form/CForm";
import { getGeneralDataAction } from "../../redux/actions/generalDataActions";
import { routes } from "../../routes/routes";
import {
  addDirectory,
  updateDirectory,
} from "../../services/directoriesServices";
import { CToast } from "../../components/common/toast/CToast";

function DirectoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { directories } = useSelector((state) => state.generalData);
  const [data, setData] = useState({
    address: "",
    phone: "",
    country: "",
  });
  useEffect(() => {
    if (id && Array.isArray(directories)) {
      const dir = directories.find((c) => c._id === id);
      if (dir) {
        setData(dir);
      }
    }
  }, [id, directories]);
  const fields = [
    {
      label: "country",
      name: "country",
      type: "text",
      required: true,
      value: data.country,
      md: 4,
    },
    {
      label: "address",
      name: "address",
      required: true,
      value: data.address,
      md: 4,
    },
    {
      label: "phone",
      type: "tel",
      name: "phone",
      required: true,
      value: data.phone,
      md: 4,
    },

    {
      buttons: [
        id
          ? {
              label: "update_data",
              type: "submit",
              variant: "contained",
              md: 8,
              loading: isLoading,
            }
          : {
              label: "a_p_dir",
              type: "submit",
              variant: "contained",
              md: 8,
              loading: isLoading,
            },
      ],
    },
  ];
  const doSubmit = async () => {
    try {
      setIsLoading(true);
      if (id) {
        await updateDirectory(data, id);
        CToast("success", "update_data_successful");
        navigate(routes.viewDirectorys);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        await addDirectory(data);
        CToast("success", "add_data_success");
      }
      dispatch(getGeneralDataAction());
      // إعادة تعيين البيانات والملفات
      setData({
        address: "",
        country: "",
        phone: "",
      });
    } catch (error) {
      // خطأ في الإرسال
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <CForm
        fields={fields}
        data={data}
        setData={setData}
        doSubmit={doSubmit}
        loading={isLoading}
      />
    </>
  );
}

export default DirectoryForm;
