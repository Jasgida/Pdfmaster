// Utility to download files while respecting server filename

export async function downloadFile(endpoint, formData) {

  try {

    const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {

      method: "POST",

      body: formData,

    });


    if (!res.ok) throw new Error("Download failed");


    const blob = await res.blob();

    const disposition = res.headers.get("Content-Disposition");


    let filename = "download.pdf";

    if (disposition && disposition.includes("filename=")) {

      filename = disposition.split("filename=")[1].replace(/['"]/g, "");

    }


    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = filename;

    document.body.appendChild(a);

    a.click();

    a.remove();

    window.URL.revokeObjectURL(url);

  } catch (err) {

    alert(err.message);

  }

}

