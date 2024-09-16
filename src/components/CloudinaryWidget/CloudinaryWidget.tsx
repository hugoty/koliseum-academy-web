import React, { useEffect, useRef } from "react";

interface CloudinaryWidgetProps {
  cloudName: string;
  uploadPreset: string;
  onUploadSuccess: (info: any) => void;
}

const CloudinaryWidget: React.FC<CloudinaryWidgetProps> = ({
  cloudName,
  uploadPreset,
  onUploadSuccess,
}) => {
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/latest/global/all.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (!widgetRef.current) {
        widgetRef.current = (window as any).cloudinary.createUploadWidget(
          {
            cloudName: cloudName,
            uploadPreset: uploadPreset,
          },
          (error: any, result: any) => {
            if (!error && result) {
              if (result.event === "success") {
                onUploadSuccess(result.info);
              }
            }
          }
        );
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [cloudName, uploadPreset, onUploadSuccess]);

  const openWidget = () => {
    if (widgetRef.current) {
      widgetRef.current.open();
    }
  };

  return (
    <button
      type="button"
      id="upload_widget"
      className="rounded-lg bg-[#2c3540b5] px-4 py-2 hover:bg-[#2c35405a] text-white"
      onClick={openWidget}
    >
      Upload files
    </button>
  );
};

export default CloudinaryWidget;
