const INITIAL_FORM_STATE = {
  PID: "",
  inPatient: false,
  age: "",
  weight: "",
  height: "",
  circumference: "",
  Date: new Date(),
  urgent: false,
  sedation: false,
  sedatedBy: "",
  sedationMethod: [],
  protocol: [],
  kV_a: [],
  kV_b: [],
  pitch: [],
  injectionSite: "",
  handInjection: false,
  mixedContrast: false,
  contrastType: "",
  rate: "",
  volume: "",
  directPostContrast: null,
  ttp: "",
  radiographers: [],
  radiologists: [],
  nurses: [],
  keywords: "",
  remark: "",
  delays: Array(1).fill(null),
  examType: [],
  ctdi: [],
  IR: false,
  ROI: "",
};

export class FormState {
  constructor(radiologists, nurses, radiographers) {
    this.PID = "";
    this.inPatient = false;
    this.age = "";
    this.weight = "";
    this.height = "";
    this.circumference = "";
    this.Date = new Date();
    this.urgent = false;
    this.sedation = false;
    this.sedatedBy = "";
    this.sedationMethod = [];
    this.protocol = [];
    this.kV_a = [];
    this.kV_b = [];
    this.pitch = [];
    this.injectionSite = "";
    this.handInjection = false;
    this.mixedContrast = false;
    this.contrastType = "";
    this.rate = "";
    this.volume = "";
    this.directPostContrast = null;
    this.ttp = "";
    this.radiographers = radiographers;
    this.radiologists = radiologists;
    this.nurses = nurses;
    this.keywords = "";
    this.remark = "";
    this.delays = Array(1).fill(null);
    this.examType = [];
    this.ctdi = [];
    this.IR = false;
    this.ROI = "";
  }
}

export default INITIAL_FORM_STATE;
