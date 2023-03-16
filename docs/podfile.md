## How to deal with Apple M1 chip and podfile errors

Sometimes the error occurs: "npx cap sync ios -- failed"
When this occurs try updating the podfile:

sudo arch -x86_64 gem install ffi
arch -x86_64 pod install
arch -x86_64 pod update

You may need to go to the folder /ios/App in order to be able to make "pod install" work

https://github.com/ffi/ffi/issues/878
