import React from 'react';
import App from './App';

//contexts
import {AppAuthProvider} from './src/context/app/AppAuthContext';
import {StudentSignUpProvider} from './src/context/onboarding/signup/StudentSignUpContext';
import {StudentLoginProvider} from './src/context/onboarding/login/StudentLoginContext';
import {CalenderProvider} from './src/context/calender/CalenderContext';
import {AnnouncementProvider} from './src/context/Announcement/AnnouncementContext';
import {ProgressProvider} from './src/context/progress/ProgressContext';
import {CanteenProvider} from './src/context/canteen/CanteenContext';
import {LibraryProvider} from './src/context/library/LibraryContext';
import {DirectoryProvider} from './src/context/directory/DirectoryContext';
import {StaffLoginProvider} from './src/context/onboarding/login/StaffLoginContext';
import {StaffSignUpProvider} from './src/context/onboarding/signup/StaffSignUpContext';
import {AdminLoginProvider} from './src/context/onboarding/login/AdminLoginContext';
import {AddDirectoryRoleProvider} from './src/context/directory/AddDirectoryRoleContext';
import {AddCanteenFoodProvider} from './src/context/canteen/AddCanteenFoodContext';
import {CredentialsProvider} from './src/context/settings/CredentialsContext';
import {SurveyProvider} from './src/context/survey/SurveyContext';
import {ShuttlePatmentProvider} from './src/context/shuttle/payment/PaymentContext';
import {OtherTimeProvider} from './src/context/shuttle/other/OtherTimeContext';
import {PaymentDetailsProvider} from './src/context/paymentDetails/paymentDetailsContext';
import {TodoProvider} from './src/context/todo/todoContext';
import {AddOtherTimeProvider} from './src/context/shuttle/other/AddOtherTimeContext';
import {AddShuttlePaymentProvider} from './src/context/shuttle/payment/AddShuttlePaymentContext';

const Main = () => {
  return (
    <AppAuthProvider>
      <StudentSignUpProvider>
        <StudentLoginProvider>
          <CalenderProvider>
            <AnnouncementProvider>
              <ProgressProvider>
                <CanteenProvider>
                  <LibraryProvider>
                    <DirectoryProvider>
                      <StaffSignUpProvider>
                        <StaffLoginProvider>
                          <AdminLoginProvider>
                            <AddDirectoryRoleProvider>
                              <AddCanteenFoodProvider>
                                <CredentialsProvider>
                                  <SurveyProvider>
                                    <ShuttlePatmentProvider>
                                      <OtherTimeProvider>
                                        <PaymentDetailsProvider>
                                          <TodoProvider>
                                            <AddOtherTimeProvider>
                                              <AddShuttlePaymentProvider>
                                                <App />
                                              </AddShuttlePaymentProvider>
                                            </AddOtherTimeProvider>
                                          </TodoProvider>
                                        </PaymentDetailsProvider>
                                      </OtherTimeProvider>
                                    </ShuttlePatmentProvider>
                                  </SurveyProvider>
                                </CredentialsProvider>
                              </AddCanteenFoodProvider>
                            </AddDirectoryRoleProvider>
                          </AdminLoginProvider>
                        </StaffLoginProvider>
                      </StaffSignUpProvider>
                    </DirectoryProvider>
                  </LibraryProvider>
                </CanteenProvider>
              </ProgressProvider>
            </AnnouncementProvider>
          </CalenderProvider>
        </StudentLoginProvider>
      </StudentSignUpProvider>
    </AppAuthProvider>
  );
};

export default Main;
