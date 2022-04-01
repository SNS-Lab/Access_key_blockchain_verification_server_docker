# 출입키 블록체인 검증모듈 서버

## 소스코드 초기설정 및 실행하기

### 소스코드 다운로드

```bash
git clone https://github.com/SNS-Lab/Access_key_blockchain_verification_server_docker.git
```

### Docker image 생성하기

```bash
docker build . -t blockchainserver
```

### Docker image 실행하기

- --network="host"가 없으면, 출입키 블록체인 서버로, 도커의 IP가 전송되므로, 출입키 블록체인 네트워크를 구성할 수 없다.
- 이를 위해, 호스트 IP를 서버로 전송한다.

```bash
docker run -p 65005:65005 -d --network="host" blockchainserver
```

### Docker 접속하기

```bash
docker exec -it <container ID> /bin/bash
```

## 출입키 블록체인 네트워크 사용하기

- 출입키 블록체인 서버 모듈로 출록체인 네트워크 참여 정보를 요청하기 위해서는 서버의 공개키로 자신의 정보를 암호화 해야 한다.
- 이를 위해, /serverNetworkKey API로 ServerNetworkKey.pem을 다운로드 받아, 출입키 블록체인 게이트웨이 모듈에 넣어야 한다.

## API Document

- 203.249.127.32는 예시 IP로, 출입키 블록체인 서버의 IP로 변경한다.

### GET http://203.249.127.32:65005/networkState

- 현재, 블록체인 네트워크에 참여하고 있는 게이트웨이 정보를 반환한다.

```bash
[
  {
    "pubIp": "203.249.126.21",
    "priIp": "192.168.0.109",
    "networkKey": "-----BEGIN RSA PUBLIC KEY-----\n ... -----END RSA PUBLIC KEY-----\n",
    "transactionKey": "-----BEGIN RSA PRIVATE KEY-----\n ... -----END RSA PRIVATE KEY-----\n"
  },
  ...
]
```

### GET http://203.249.127.32:65005/blockLog

- 출입키 블록체인 서버 모듈의 로그 기록을 반환한다.

```bash
[
  "4/1/2022, 2:20:59 AM [Info] 200: 출입키 블록체인 IP 관리 모듈 초기화",
  "4/1/2022, 2:20:59 AM [Info] 200: 출입키 블록체인 초기설정 모듈 초기화",
  "4/1/2022, 2:20:59 AM [Info] 200: 출입키 블록체인 키 관리 모듈 초기화",
  "4/1/2022, 2:20:59 AM [Info] 200: 출입키 블록체인 참여 정보 관리 모듈 초기화",
  "4/1/2022, 2:20:59 AM [Info] 200: 출입키 블록체인 인터페이스 모듈 초기화",
  "4/1/2022, 2:20:59 AM [Info] 200: 네트워크 키 파일 초기화 완료",
  "4/1/2022, 2:20:59 AM [Info] 200: 출입키 블록체인 검증 모듈 파일 초기화 완료",
  "4/1/2022, 2:22:41 AM [Info] 200: 출입키 블록체인 네트워크 정보 반환",
  "4/1/2022, 2:29:19 AM [Info] 200: 참여 요청 정보 저장 완료(공인 IP: 203.249.126.21, 사설 IP: 192.168.0.109)",
  ...
]
```

### GET http://203.249.127.32:65005/serverNetworkKey

- 출입키 블록체인 서버의 ServerNetworkKey.pem을 다운로드 한다.
