import { actions } from '@/actions/index'
import { Button } from './ui/button'


export const LogOut = async () => {
    const user = await actions.auth.getUser();

    return (
        <>
        {user && (
            <Button variant="destructive" className='hover:cursor-pointer' onClick={actions.auth.logoutUserAction}>Log Out</Button>
        )}
        </>
    )
}   