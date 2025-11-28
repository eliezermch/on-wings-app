import { actions } from '@/actions/index'
import { Button } from './ui/button'

export const LogOut = () => {
    return (
        <Button variant="destructive" className='hover:cursor-pointer' onClick={actions.auth.logoutUserAction}>Log Out</Button>
    )
}   