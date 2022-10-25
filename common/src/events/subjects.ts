export enum Subjects {
  PatientCreated = "patient:created",
  PatientUpdated = "patient:updated",
  PatientChangedDischargePatient = "patient:updated:changedischarge-patient",
  PatientChangedDischargeAdmin = "patient:updated:changedischarge-admin",
  PatientProviderChangePatient = "patient:updated:changed-provider-patient",
  PatientProviderChangeAdmin = "patient:updated:changed-provider-admin",
  PatientDeleted = "patient:deleted",

  ProviderCreated = "provider:created",
  ProviderUpdated = "provider:updated",
  ProviderDeleted = "provider:deleted",

  OrderCreated = "order:created",
  OrderUpdated = "order:updated",
  OrderDeleted = "order:deleted",
  OrderCreatedAdmin = "order:created-admin",
  OrderUpdatedAdmin = "order:updated-admin",
  OrderDeletedAdmin = "order:deleted-admin",

  PreferenceCreated = "preference:created",
  PreferenceUpdated = "preference:updated",
  PreferenceDeleted = "preference:deleted",
  PreferenceRemoved = "preference:removed",
  PreferenceAdded = "preference:added",

  RestrictionCreated = "restriction:created",
  RestrictionUpdated = "restriction:updated",
  RestrictionDeleted = "restriction:deleted",
  RestrictionRemoved = "restriction:removed",
  RestrictionAdded = "restriction:added",

  IngredientCreated = "ingredient:created",
  IngredientUpdated = "ingredient:updated",
  IngredientDeleted = "ingredient:deleted",

  FoodItemCreated = "foodItem:created",
  FoodItemUpdated = "foodItem:updated",
  FoodItemDeleted = "foodItem:deleted",

  EntreeCreated = "entree:created",
  EntreeUpdated = "entree:updated",
  EntreeDeleted = "entree:deleted",

  DayCreated = "day:created",
  DayUpdated = "day:updated",
  DayDeleted = "day:deleted",
}
