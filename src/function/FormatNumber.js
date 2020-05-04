export const formatNumber = (num) => {
  const numb = num.replace(/[^,\d]/g, "").toString();
  const split = numb.split(",");
  const sisa = split[0].length % 3;
  let rupiah = split[0].substr(0, sisa);
  const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  if (ribuan) {
    const separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
  return rupiah;
};

export const haveValue = (state) => {
  if (
    state !== "" &&
    state !== null &&
    state !== isNaN &&
    state !== 0 &&
    state !== undefined
  ) {
    return true;
  } else {
    return false;
  }
};
