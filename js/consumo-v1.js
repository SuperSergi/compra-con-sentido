/* =========================================================
   COMPRA CON SENTIDO · CALCULADORA DE CONSUMO (v1, 12/11/2026)
   Uso: <figure class="ccs-chart" data-ccs-consumo
          data-kwh-real="0.1375" data-kwh-max="0.19"> … </figure>
   Precios: PVPC, media mensual del término de energía sin
   impuestos (OCU, informe de octubre de 2026). Se aplica
   impuesto eléctrico (5,11 %) e IVA (21 %). No incluye el
   término de potencia ni el alquiler del contador.
   ========================================================= */
(() => {
  const MESES = ["oct", "nov", "dic", "ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep"];
  const NOMBRES = ["octubre de 2025", "noviembre de 2025", "diciembre de 2025", "enero de 2026", "febrero de 2026", "marzo de 2026", "abril de 2026", "mayo de 2026", "junio de 2026", "julio de 2026", "agosto de 2026", "septiembre de 2026"];
  const PRECIOS = {
    media: [0.151032, 0.142128, 0.154968, 0.145484, 0.123981, 0.144770, 0.126486, 0.124885, 0.131954, 0.162509, 0.167539, 0.186520],
    punta: [0.216001, 0.208890, 0.219687, 0.213514, 0.198388, 0.222543, 0.182196, 0.172829, 0.184064, 0.216230, 0.219382, 0.246175],
    llano: [0.137092, 0.133968, 0.150972, 0.139956, 0.109556, 0.129088, 0.113095, 0.113095, 0.117451, 0.146008, 0.143817, 0.160363],
    valle: [0.116827, 0.109322, 0.116492, 0.108082, 0.097530, 0.108221, 0.099681, 0.099681, 0.109459, 0.139395, 0.153465, 0.165485]
  };
  const IMPUESTOS = 1.0511 * 1.21;
  const DIAS = [31, 30, 31, 31, 28, 31, 30, 31, 30, 31, 31, 30];

  const euros = value =>
    value.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

  const iniciar = figure => {
    const horas = figure.querySelector("[data-horas]");
    const modo = figure.querySelector("[data-modo]");
    const tramo = figure.querySelector("[data-tramo]");
    const salidaHoras = figure.querySelector("[data-salida-horas]");
    const cols = figure.querySelector(".ccs-cols");
    const labels = figure.querySelector(".ccs-cols__labels");
    const kpis = {
      actual: figure.querySelector("[data-kpi-actual]"),
      anual: figure.querySelector("[data-kpi-anual]"),
      kwh: figure.querySelector("[data-kpi-kwh]"),
      rango: figure.querySelector("[data-kpi-rango]")
    };
    if (!horas || !modo || !tramo || !cols || !labels) return;

    cols.innerHTML = "";
    labels.innerHTML = "";
    const barras = MESES.map(mes => {
      const col = document.createElement("div");
      col.className = "ccs-cols__col";
      col.appendChild(document.createElement("i"));
      cols.appendChild(col);
      const label = document.createElement("span");
      label.textContent = mes;
      labels.appendChild(label);
      return col;
    });

    const calcular = () => {
      const h = Number(horas.value);
      const kwhHora = Number(modo.value === "max" ? figure.dataset.kwhMax : figure.dataset.kwhReal);
      const precios = PRECIOS[tramo.value] || PRECIOS.media;
      const costes = precios.map((p, i) => h * kwhHora * DIAS[i] * p * IMPUESTOS);
      const maximo = Math.max(...costes);
      const minimo = Math.min(...costes);
      costes.forEach((coste, i) => {
        const col = barras[i];
        col.style.setProperty("--ccs-bar", (maximo ? (coste / maximo) * 100 : 0).toFixed(1) + "%");
        col.classList.toggle("is-pico", coste === maximo);
        col.title = NOMBRES[i] + ": " + euros(coste);
        col.setAttribute("aria-label", NOMBRES[i] + ": " + euros(coste));
        col.setAttribute("role", "img");
      });
      if (salidaHoras) salidaHoras.textContent = h + (h === 1 ? " hora" : " horas");
      if (kpis.actual) kpis.actual.textContent = euros(costes[costes.length - 1]);
      if (kpis.anual) kpis.anual.textContent = euros(costes.reduce((a, b) => a + b, 0));
      if (kpis.kwh) kpis.kwh.textContent = Math.round(h * kwhHora * 30) + " kWh";
      if (kpis.rango) kpis.rango.textContent = euros(minimo) + " – " + euros(maximo);
    };

    [horas, modo, tramo].forEach(control => control.addEventListener("input", calcular));
    calcular();
  };

  const arrancar = () => document.querySelectorAll("[data-ccs-consumo]").forEach(iniciar);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", arrancar);
  } else {
    arrancar();
  }
})();
