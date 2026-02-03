import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './baseQuery';
import { updateMembership, updateUser } from './authSlice';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Membership', 'Members'],
  endpoints: builder => ({
    getPublicContent: builder.query({
      query: slug => ({
        url: `users/content/${slug}`,
        method: 'GET',
      }),
    }),

    getPlanList: builder.query<any, void>({
      query: () => ({
        url: 'users/plans',
        method: 'GET',
      }),
      providesTags: ['Membership'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          const activePlan = data?.data?.currentPlan || {};
          console.log(activePlan, 'activePlan');

          if (activePlan && Object.keys(activePlan).length > 0) {
            console.log('this is called');

            dispatch(
              updateMembership({
                planId: activePlan?.plan?._id,
                planName: activePlan?.plan?.name,
                expiresAt: activePlan?.endDate,
                subscriptionCycle: activePlan?.plan?.billingCycle || '',
                type: activePlan?.plan?.type || '',
                isActive: true,
              }),
            );
          } else {
            dispatch(updateMembership(null));
          }
        } catch (error) {
          console.log('❌ getPlanList failed:', error);
        }
      },
    }),

    purchaseSubscription: builder.mutation({
      query: body => ({
        url: 'users/subscription/purchase',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Membership'],
    }),
    getAllMembers: builder.query({
      query: () => ({
        url: 'users/subscription/members',
        method: 'GET',
      }),
      providesTags: ['Members'],
    }),
    addMember: builder.mutation<
      any,
      { name: string; email: string; password: string }
    >({
      query: body => ({
        url: 'users/subscription/member',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Members'],
    }),
    removeMember: builder.mutation<any, { email: string }>({
      query: body => ({
        url: 'users/subscription/member/remove',
        method: 'POST',
        body,
      }),

      async onQueryStarted({ email }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          userApi.util.updateQueryData(
            'getAllMembers',
            undefined,
            (draft: any) => {
              draft.data.members = draft.data.members.filter(
                (member: any) => member.email !== email,
              );
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          console.log('undocalled', patchResult);

          patchResult.undo();
        }
      },
    }),
    editProfile: builder.mutation<any, { username: string; email: string }>({
      query: body => ({
        url: 'users/profile',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(
              updateUser({
                username: data?.data?.username,
                email: data?.data?.email,
              }),
            );
          }
        } catch (error) {
          console.log('Errror to updating data');
        }
      },
    }),
    getProfile: builder.query({
      query: () => ({
        url: 'users/account',
        method: 'GET',
      }),
    }),
    getAllTranscations: builder.query({
      query: () => ({
        url: 'users/transactions',
        method: 'GET',
      }),
    }),
    getAllMedicine: builder.query({
      query: params => ({
        url: 'users/medicines',
        method: 'GET',
        params,
      }),
    }),
    changePassword: builder.mutation({
      query: body => ({
        url: 'users/change-password',
        method: 'POST',
        body,
      }),
    }),
    sendFeedBack: builder.mutation({
      query: body => ({
        url: 'users/feedback',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetPublicContentQuery,
  useLazyGetPublicContentQuery,
  useGetPlanListQuery,
  usePurchaseSubscriptionMutation,
  useGetAllMembersQuery,
  useRemoveMemberMutation,
  useAddMemberMutation,
  useEditProfileMutation,
  useGetAllTranscationsQuery,
  useChangePasswordMutation,
  useGetAllMedicineQuery,
  useSendFeedBackMutation,
  useGetProfileQuery
} = userApi;
