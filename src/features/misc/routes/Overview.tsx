import { MainLayout } from '@/componentes/Layout/MainLayout';
import { Link } from '@/componentes/Elements/Link/Link';
import { useTranslation } from 'react-i18next';
import { Breadcrumb } from '@/componentes/Elements/Breadcrumb/Breadcrumb';
import { Head } from '@/componentes/Layout/Head';
import { Title } from '@/componentes/Elements/Title/Title';
import { ReactComponent as ArrowRight } from '@/assets/icons/bx-arrow-right.svg';
import { Pill } from '@/componentes/Elements/Pill/Pill';
import OverviewImage from '../../../assets/images/overview.jpg';
import { Button } from '@/componentes/Elements/Button/Button';

const tableData = [
  {
    type: 'buy',
    total: '641,20 CC',
    operationId: '3DkQyAdif6kQLPMBudsa23rfew',
    date: '02-02-2022  21:12',
  },
  {
    type: 'sell',
    total: '332,12 CC',
    operationId: '23fasfaDkQyAdif6kQLdsaPMBu',
    date: '02-02-2022  21:12',
  },
  {
    type: 'transfer',
    total: '112,10 CC',
    operationId: '3tr6uffgDkQygfeAdif6kQLPMBu',
    date: '02-02-2022  21:12',
  },
];

export const Overview = () => {
  const { t } = useTranslation();

  return (
    <MainLayout title={t('misc.Overview.title')}>
      <Head title="Overview" />

      <div id="top-row" className="flex flex-col p-8">
        <div className="mt-5 grid md:grid-cols-3">
          <div id="price-panel" className="flex flex-col gap-6">
            <Title size={4} as={1}>
              Overview
            </Title>
            <p className="text-sm font-medium text-neutral-3">
              {t('components.Overview.totalBalance')}
            </p>
            <div>
              <div className="flex items-center">
                <p className="mr-2 text-6xl text-neutral-2">112,65</p>
                <div className="h-[1.625rem] w-[6.6875rem] text-center">
                  <Pill key="climatecoin" style="solid" variant="popular">
                    Climatecoins
                  </Pill>
                </div>
              </div>
              <p className="text-2xl text-neutral-4">185,36 € </p>
            </div>
            <div className="w-[17.8125rem] space-y-4">
              <Link size="sm" as="button" variant="primary" to="/">
                {t('components.Overview.footprint')}
              </Link>
              <Link size="sm" variant="light" to="/" as="button">
                {t('components.Overview.buyClimatecoins')}
              </Link>
            </div>
          </div>
          <div id="graphic-panel" className="col-span-2" />
        </div>
      </div>

      <div id="bottom-row" className="grid gap-7 md:grid-cols-3">
        <div
          id="view-more-panel"
          className="flex h-[27.25rem] flex-col justify-end rounded-xl bg-cover bg-center px-8 pb-6 text-neutral-9 "
          style={{ backgroundImage: `url(${OverviewImage})` }}
        >
          <Title size={4} as={3}>
            {t('components.Overview.viewMore.title')}
          </Title>
          <p className="text-sm text-neutral-6">{t('components.Overview.viewMore.subtitle')}</p>
          <div className="mt-8 h-[3rem] w-[9.0625rem]">
            <Link
              size="sm"
              iconRight={<ArrowRight className="ml-1" />}
              variant="light"
              to="/"
              as="button"
            >
              {t('components.Overview.viewMore.link')}
            </Link>
          </div>
        </div>
        <div id="activity-panel" className="flex flex-col space-y-7 md:col-span-2">
          <div id="activity-panel-tabs" className="flex gap-4 ">
            <Button size="sm" key="all" variant="light">
              {t('components.Overview.all')}
            </Button>
            <Button size="sm" key="buy" variant="light">
              {t('components.Overview.buy')}
            </Button>
            <Button size="sm" key="sell" variant="light">
              {t('components.Overview.sell')}
            </Button>
            <Button size="sm" key="transfer" variant="light">
              {t('components.Overview.transfer')}
            </Button>
            <Button size="sm" key="offset" variant="light">
              {t('components.Overview.offset')}
            </Button>
          </div>
          <hr />
          <Title size={4} as={1}>
            {t('components.Overview.activity')}
          </Title>
          <table className="w-full border-separate [border-spacing:1rem]">
            <thead>
              <tr className="mb-5 border-b">
                <th className="text-left"> {t('components.Overview.type')}</th>
                <th className="text-left"> {t('components.Overview.total')}</th>
                <th className="text-left"> {t('components.Overview.operationId')}</th>
                <th className="text-right"> {t('components.Overview.date')}</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((data, i) => {
                return (
                  <tr key={i}>
                    <td key="type">{data.type}</td>
                    <td key="total">{data.total}</td>
                    <td key="operation">{data.operationId}</td>
                    <td className="text-right" key="date">
                      {data.date}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-12 flex flex-col justify-items-start border-2 border-black">
        <Link className="mb-2 mt-2 bg-secondary" to="/wallet">
          Wallet / 0 CLIMATE
        </Link>
        <Link className="mb-2 mt-2 bg-secondary" to="/documents/upload">
          {t('uploadDocuments.link')}
        </Link>
        <Link className="mb-2 mt-2 bg-secondary" to="/documents/list">
          documents
        </Link>
        <Link className="mb-2 mt-2 bg-secondary" to="/profile">
          profile
        </Link>
      </div>
    </MainLayout>
  );
};