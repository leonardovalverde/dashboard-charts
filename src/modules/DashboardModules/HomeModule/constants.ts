const attentionStatus = ["inAlert", "unplanedStop", "planedStop", "inDowntime"];

const StatusTranslate: Record<string, string> = {
  "": "Sem status",
  inOperation: "Em operação",
  inAlert: "Em alerta",
  inDowntime: "Em parada",
  unplannedStop: "Parada não programada",
  plannedStop: "Parada programada",
};

export { attentionStatus, StatusTranslate };
