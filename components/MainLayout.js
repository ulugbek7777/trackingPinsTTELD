import style from './../styles/style.module.css';
import Image from 'next/image';
import logo from '../images/logo.svg';
import statusIcon from '../images/status.svg';
import moment from 'moment-timezone';
import Head from 'next/head';

function MainLayout({ children, name, driver, trackings, company }) {
    console.log(company)
    const last_tracking = trackings[trackings.length - 1];
    console.log(last_tracking)
  return <div className={style.container}>
      <Head>
          <title>Tracking Map</title>
          <meta name="keywords" content="tteld, tracking map" />
          <meta name="description" content="this is tracking map from tteld" />
          <meta charSet="utf-8" />

      </Head>
      <div className={style.left_sidebar}>
          <div className={style.block}>
              <div className={style.header}>
                <div className={style.logo}>
                    <Image height={100} className={style.logo_image} src={logo} alt="logo"/>
                </div>
              </div>
              <div className={style.company}>
                <div className={style.cmp_name_icon}>
                    <Image src={statusIcon} alt="logo"/>
                    <span className={style.comapany_text}>{name}</span>
                </div>
                <div className={style.driver_data}>
                    <div className={style.left}>
                        <div className={style.info}>
                            <div className={style.infoText}>Driver full name</div>
                            <p className={style.infoData}>{driver.first_name + ' ' + driver.second_name}</p>
                        </div>
                        <div className={style.info}>
                            <div className={style.infoText}>Phone</div>
                            <p className={style.infoData}>{driver.phone}</p>
                        </div>
                        <div className={style.info}>
                            <div className={style.infoText}>Trailer</div>
                            <p className={style.infoData}>{ driver.trailer ? driver.trailer : 'no trailer' }</p>
                        </div>
                        <div className={style.info}>
                            <div className={style.infoText}>Current location</div>
                            <p className={style.infoData}>{ last_tracking.address }</p>
                        </div>
                        <div className={style.info}>
                            <div className={style.infoText}>Time Zone</div>
                            <p className={style.infoData}>{ company.tz.value }</p>
                        </div>
                        <div className={style.info}>
                            <div className={style.infoText}>Time</div>
                            <p className={style.infoData}>{ moment(last_tracking.checked_date).tz(company.tz.value).format('DD-MM-YYYY hh:mm:ss z') }</p>
                        </div>
                    </div>
                </div>
              </div>
          </div>
      </div>
      <div className={style.right_sidebar}>{ children }</div>
  </div>;
}

export default MainLayout;
