export interface IFaqs {
  id: string;
  title: string;
  descrption: string;
  title_en: string;
  title_ar: string;
  descrption_ar: string;
  descrption_en: string;
}

export interface AddEditFaqsBody {
  id?: string;
  title_ar: string;
  title_en: string;
  descrption_ar: string;
  descrption_en: string;
}
