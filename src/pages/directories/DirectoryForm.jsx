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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { directories, categories, countries } = useSelector(
    (state) => state.generalData
  );
  const { id } = useParams();
  // useEffect(() => {
  //   const updatedData = { ...data };

  //   if (categoryId) {
  //     updatedData.category = categoryId;
  //   }

  //   if (id) {
  //     updatedData.country = id;
  //   }

  //   if (categoryId || id) {
  //     setData(updatedData);
  //   }
  // }, [categoryId, id]);
  useEffect(() => {
    if (id && Array.isArray(directories)) {
      const dir = directories.find((c) => c._id === id);
      dir.category = dir.category?._id;
      dir.country = dir.country?._id;
      if (dir) {
        setData(dir);
      }
    }
  }, [id, directories]);
  const [data, setData] = useState({
    notes: "",
    image: "",
    name: "",
    address: "",
    phone: "",
    email: "",
    country: "",
    category: "",
  });
  const fields = [
    {
      label: "name",
      name: "name",
      required: true,
      value: data.name,
      // md: 4,
    },

    {
      label: "category",
      name: "category",
      required: true,
      options: categories,
      translate: true,
      type: "select",
      value: data.category,
      md: 6,
    },
    {
      label: "country",
      name: "country",
      required: true,
      options: countries,
      type: "select",
      value: data.country,
      md: 6,
    },
    // {
    //   label: "email",
    //   name: "email",
    //   value: data.email,
    //   type: "email",

    //   md: 4,
    // },
    {
      label: "phone",
      name: "phone",
      type: "tel",
      value: data.phone,
      md: 6,
    },
    {
      label: "address",
      name: "address",
      value: data.address,
      md: 6,
    },
    {
      label: "notes",
      name: "notes",
      type: "textarea",
      rows: 5,
      value: data.notes,
      md: 12,
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
        note: "",
        image: "",
        name: "",
        address: "",
        phone: "",
        email: "",
        country: "",
        category: "",
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
