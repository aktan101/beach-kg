import { useTranslation } from "react-i18next"

const AboutKyrgyzstan = () => {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{t("about.title")}</h1>
        <p className="text-xl text-gray-600 mb-8">{t("about.subtitle")}</p>

        <div className="mb-12">
          <img
            src="https://static.wixstatic.com/media/846d71_5a4f1315ee384add837ec35768797597~mv2_d_1920_1281_s_2.jpg/v1/fill/w_980,h_654,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/846d71_5a4f1315ee384add837ec35768797597~mv2_d_1920_1281_s_2.jpg"
            alt="Kyrgyzstan Landscape"
            className="w-full h-96 object-cover rounded-xl mb-6"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">{t("about.geography.title")}</h2>
            <p className="text-gray-700">{t("about.geography.content")}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">{t("about.culture.title")}</h2>
            <p className="text-gray-700">{t("about.culture.content")}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">{t("about.tourism.title")}</h2>
            <p className="text-gray-700">{t("about.tourism.content")}</p>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Issyk-Kul Lake</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSEgaHBPhxu8Vn-A9KtTxd7MdVrk8H0AeOMQ&s" alt="Issyk-Kul Lake" className="w-full h-64 object-cover rounded-xl" />
            <div>
              <p className="text-gray-700 mb-4">
                Issyk-Kul is the largest lake in Kyrgyzstan and the second largest mountain lake in the world after Lake
                Titicaca. It is located in the northeastern part of the country, between two mountain ranges.
              </p>
              <p className="text-gray-700">
                The lake's name means "warm lake" in the Kyrgyz language, as it never freezes despite being surrounded
                by snow-capped mountains. This is due to its slight salinity and significant depth.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Kyrgyz Nomadic Culture</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-gray-700 mb-4">
                The Kyrgyz people have a rich nomadic heritage that dates back thousands of years. Traditional nomadic
                life revolves around raising livestock and moving between seasonal pastures.
              </p>
              <p className="text-gray-700">
                The yurt (boz-üy) is the traditional dwelling of the Kyrgyz nomads. These portable, round tents are made
                of felt and wood and are perfectly adapted to the nomadic lifestyle and harsh mountain climate.
              </p>
            </div>
            <img src="https://trvlland.com/wp-content/uploads/2021/09/kyrgyzstan_yurts_songkul-1024x576.jpg" alt="Kyrgyz Yurt" className="w-full h-64 object-cover rounded-xl" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Tourism in Kyrgyzstan</h2>
          <p className="text-gray-700 mb-4">
            Kyrgyzstan offers a wide range of tourism opportunities, from beach vacations at Issyk-Kul to mountain
            hiking, horseback riding, and experiencing nomadic culture. The country's untouched natural beauty, combined
            with its rich cultural heritage, makes it an increasingly popular destination for travelers seeking
            authentic experiences off the beaten path.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <img
              src="https://www.journalofnomads.com/wp-content/uploads/2021/09/Roadtrip-Adventure.jpg"
              alt="Kyrgyzstan Tourism"
              className="w-full h-48 object-cover rounded-xl"
            />
            <img
              src="https://landlopers.com/wp-content/uploads/2017/08/35395188583_92144c47c7_k.jpg"
              alt="Kyrgyzstan Tourism"
              className="w-full h-48 object-cover rounded-xl"
            />
            <img
              src="https://www.journalofnomads.com/wp-content/uploads/2021/08/Best-of-Kyrgyzstan-Tour.jpg"
              alt="Kyrgyzstan Tourism"
              className="w-full h-48 object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutKyrgyzstan

