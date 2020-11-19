export function fetchData() {
  fetch("https://kea-alt-del.dk/kata-distortion/")
    .then((e) => e.json())
    .then((data) => {
      console.log(
        data,
        data.inQueue,
        data.personel[0],
        data.personel[1],
        data.personel[2]
      );
    });
}
