# seoulmetro


## 빌드 순서

### 공통: git clone
### 프론트 : cd client => npm install => npm start
### 백엔드 : cd server => npm install => npm start

<img width="967" alt="스크린샷 2023-02-10 오전 7 34 08" src="https://user-images.githubusercontent.com/87353284/217954501-d50ef4fa-fe26-496f-a708-69808fbc09a4.png">

package what;

import java.util.ArrayList;
import java.util.List;

public class magic {
	public static void main(String[] args) {
		Object[] arr = { new Dept(), new User(), new Member(), new Company(), new User() };
		
		List<User> list = new ArrayList<>();
		
		for (int i = 0; i < arr.length; i++) {
			boolean isUser = arr[i].getClass().getName() == "what.User";
			
			if(isUser) {
				list.add((User) arr[i]);
			}
		}
		
	}
	
	
}
