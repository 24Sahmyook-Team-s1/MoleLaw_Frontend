import styled from "@emotion/styled"
import { Point } from "../style/Colors"
import { useAuthStore } from "../store/states"

const Wrapper = styled.div`
    width: 305px;
    height: 130px;
    background-color: ${Point};
    border-radius: 20px;

    padding: 10px;

    display: grid;
    grid-template-rows: 1fr auto;

    position: absolute;
    bottom: 50px;
    left: 10px;
    z-index: 500;
`

const Profile = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    padding: 10px;
    gap: 20px;
`

const ProfilePhoto = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: white;
`

const ProfileText = styled.div`
    display:grid;
    grid-template-rows: 1fr 1fr;
    height: 50px;
    color:white;
    font-size: 15px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const Name = styled.div`
    font-size: 21px;
`

const Email = styled.div`
    font-size: 12px;
`

const Logout = styled.div`
    display:flex;
`

const LogoutButton= styled.button`
    width: 100%;
    height: 35px;
    padding: 0;
    background-color: #f85454;
    border: 1px solid #fc8484;
    font-size: 18px;
    color: white;
`

const ProfilePanel:React.FC = () => {
    const {logout, user} = useAuthStore();
    
    return(
    <Wrapper>
        <Profile>
            <ProfilePhoto/>
            <ProfileText>
                <Name>{user?.nickname}</Name>
                <Email>{user?.email}</Email>
            </ProfileText>
        </Profile>
        <Logout>
            <LogoutButton onClick={logout}>로그아웃</LogoutButton>
        </Logout>
    </Wrapper>
    )
    
}

export default ProfilePanel;