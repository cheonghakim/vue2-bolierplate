### app: 비회원 유저도 사용가능한 API

### common: 메뉴에 관계없이 페이지설정에 필요한 API

### user: 로그인한 유저가 사용 가능한 API, 각 메뉴에 따라 구분되어 있다.

각각의 API는 중간 연결을 통해 각 버전과 연결되어 있다.

API의 기능이 변경되면 버전폴더를 추가하고 중간연결자에 버전을 추가한다.

예시)

```javascript
import v1 from "./v1/SignupAPI";
import v2 from "./v2/SignupAPI";
import v3 from "./v3/SignupAPI";

export default {
  v1,
  v2,
  v3,
};
```
