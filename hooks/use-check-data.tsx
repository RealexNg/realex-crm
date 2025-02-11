// import {json, LoaderFunctionArgs, useRouteLoaderData} from 'react-router-dom';

// import {getSessionId} from '~/app/auth/utils/session';
// import AppService from '~/services/endpoints/app';
// import Store from '~/store';
// import {SMTP} from '~/types/entities';
// import {getAppInfo} from '~/utils/app';

// export async function loader({request}: LoaderFunctionArgs) {
//   await getSessionId();
//   const user = await getAppInfo();

//   if (!user) {
//     return null;
//   }
//   const customerEmails = await Store.dispatch(
//     AppService.endpoints.getAppSMTPs.initiate(user.publicKey)
//   );

//   //   if (customerEmails.error) {
//   //     parseQueryErr(customerEmails.error);
//   //     return [];
//   //   }
//   return json(customerEmails.data?.data);
// }
// const useDataCheck = () => {
//   const customerEmails = useRouteLoaderData('create_campaign') as SMTP[];
//   console.log(customerEmails, 'customerEmails');
// };

// export default useDataCheck;
