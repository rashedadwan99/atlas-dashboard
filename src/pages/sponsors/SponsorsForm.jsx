import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../routes/routes";
import { addSponsor, updateSponsor } from "../../services/sponsors";
import { useSelector } from "react-redux";
import FilePicker from "../../components/common/form/CFilePicker";
import CForm from "../../components/common/form/CForm";
import { getUserToken } from "../../services/userService";

function SponsorsForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { sponsors } = useSelector((state) => state.generalData);
  const [files, setFiles] = useState([]);

  const [data, setData] = useState({
    name: "",
    image: "",
    url: "",
  });
  const handleFileChange = (newFiles) => {
    setFiles(newFiles);
    setData((prev) => ({
      ...prev,
      image: newFiles[0] || null,
    }));
  };
  useEffect(() => {
    if (id && Array.isArray(sponsors)) {
      const spon = sponsors.find((c) => c._id === id);
      if (spon) {
        setData(spon);

        // تمرير الصورة كرابط إلى FilePicker
        if (spon.image) {
          setFiles([spon.image]);
        }
      }
    }
  }, [id, sponsors]);
  const fields = [
    {
      label: "name",
      name: "name",
      required: true,
      value: data.name,
      md: 4,
    },
    {
      label: "url",
      name: "url",
      required: true,
      value: data.url,
      md: 8,
    },
    {
      buttons: [
        id
          ? {
              label: "update_data",
              type: "submit",
              variant: "contained",
              md: 4,
              loading: isLoading,
            }
          : {
              label: "add_sponsors",
              type: "submit",
              variant: "contained",
              md: 4,
              loading: isLoading,
            },
      ],
    },
  ];
  const doSubmit = async () => {
    const formData = new FormData();

    formData.append("api_token", getUserToken());
    formData.append("name", data.name);
    formData.append("url", data.url);

    if (data.image) {
      formData.append("image", data.image);
    }

    try {
      setIsLoading(true);
      if (id) {
        await updateSponsor(formData, id);
        CToast("success", "update_data_successful");
        navigate(routes.viewSponsors);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        await addSponsor(formData);
        CToast("success", "ad_data_success");
      }
      dispatch(getGeneralDataAction());
      // إعادة تعيين البيانات والملفات
      setData({
        name: "",
        image: "",
        url: "",
      });
      setFiles([]);
    } catch (error) {
      // خطأ في الإرسال
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FilePicker
        labelTextKey="upload_img"
        multiple={false}
        accept="image/*"
        maxSizeMB={5}
        value={files}
        onChange={handleFileChange}
      />

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

export default SponsorsForm;
