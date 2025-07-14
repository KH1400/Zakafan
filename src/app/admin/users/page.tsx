
"use client"

import * as React from "react";
import {
  File,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import ProtectedRoute from "../../../components/protected-route";

type User = {
  id: string;
  name: string;
  email: string;
  role: "مدیر کل" | "نویسنده" | "ویرایشگر" | "مشترک";
  status: "فعال" | "غیرفعال";
  lastActive: string;
  avatar: string;
};

const sampleUsers: User[] = [
  {
    id: "USR-001",
    name: "علی رضایی",
    email: "ali.rezaei@example.com",
    role: "مدیر کل",
    status: "فعال",
    lastActive: "۳ ساعت پیش",
    avatar: "AR",
  },
  {
    id: "USR-002",
    name: "مریم احمدی",
    email: "maryam.ahmadi@example.com",
    role: "نویسنده",
    status: "فعال",
    lastActive: "دیروز",
    avatar: "MA",
  },
  {
    id: "USR-003",
    name: "حسین محمدی",
    email: "hossein.mohammadi@example.com",
    role: "ویرایشگر",
    status: "غیرفعال",
    lastActive: "۱ هفته پیش",
    avatar: "HM",
  },
  {
    id: "USR-004",
    name: "سارا کریمی",
    email: "sara.karimi@example.com",
    role: "نویسنده",
    status: "فعال",
    lastActive: "۲ ساعت پیش",
    avatar: "SK",
  },
  {
    id: "USR-005",
    name: "رضا قاسمی",
    email: "reza.ghasemi@example.com",
    role: "مشترک",
    status: "فعال",
    lastActive: "۵ دقیقه پیش",
    avatar: "RQ",
  },
];

export default function UsersPage() {
  const { toast } = useToast();
  const [users, setUsers] = React.useState<User[]>(sampleUsers);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isDeleteAlertOpen, setDeleteAlertOpen] = React.useState(false);
  const [isFormDialogOpen, setFormDialogOpen] = React.useState(false);
  const [userToDelete, setUserToDelete] = React.useState<User | null>(null);
  const [userToEdit, setUserToEdit] = React.useState<User | null>(null);

  const filteredUsers = React.useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  const openDeleteAlert = (user: User) => {
    setUserToDelete(user);
    setDeleteAlertOpen(true);
  };

  const handleDeleteUser = () => {
    if (!userToDelete) return;
    setUsers(users.filter((user) => user.id !== userToDelete.id));
    toast({
      title: "کاربر حذف شد",
      description: `کاربر ${userToDelete.name} با موفقیت حذف شد.`,
      variant: "default",
    });
    setDeleteAlertOpen(false);
    setUserToDelete(null);
  };
  
  const handleOpenFormDialog = (user: User | null) => {
    setUserToEdit(user);
    setFormDialogOpen(true);
  };

  const handleSaveUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const role = formData.get('role') as User['role'];
    
    const newUser: User = {
        id: userToEdit ? userToEdit.id : `USR-00${users.length + 1}`,
        name,
        email,
        role,
        status: userToEdit ? userToEdit.status : 'فعال',
        lastActive: userToEdit ? userToEdit.lastActive : 'همین الان',
        avatar: name.split(' ').map(n => n[0]).join('').toUpperCase()
    };

    if (userToEdit) {
        setUsers(users.map(u => u.id === userToEdit.id ? newUser : u));
         toast({ title: "کاربر ویرایش شد", description: `اطلاعات ${name} با موفقیت به‌روزرسانی شد.` });
    } else {
        setUsers([newUser, ...users]);
         toast({ title: "کاربر اضافه شد", description: `${name} با موفقیت به لیست کاربران اضافه شد.` });
    }
    setFormDialogOpen(false);
    setUserToEdit(null);
  }

  return (
    <ProtectedRoute accessRoles={['admin']}>
      <div className="flex flex-col min-h-full p-4 md:p-6 bg-muted/40 font-persian" dir="rtl">
        <Card>
          <CardHeader>
            <CardTitle>مدیریت کاربران</CardTitle>
            <CardDescription>
              کاربران سایت را مشاهده، اضافه یا مدیریت کنید.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="relative w-full md:w-1/3">
                <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="جستجوی کاربر..."
                  className="pr-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="gap-1" onClick={() => handleOpenFormDialog(null)}>
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  افزودن کاربر
                </span>
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>کاربر</TableHead>
                  <TableHead>نقش</TableHead>
                  <TableHead>وضعیت</TableHead>
                  <TableHead>آخرین فعالیت</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={`https://placehold.co/40x40.png?text=${user.avatar}`} data-ai-hint="user avatar" />
                          <AvatarFallback>{user.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-0.5">
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === "فعال" ? "default" : "secondary"}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.lastActive}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>عملیات</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleOpenFormDialog(user)}>ویرایش</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => openDeleteAlert(user)}>
                            حذف
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Add/Edit User Dialog */}
        <Dialog open={isFormDialogOpen} onOpenChange={setFormDialogOpen}>
              <DialogContent className="sm:max-w-[425px] font-persian" dir="rtl">
                  <form onSubmit={handleSaveUser}>
                      <DialogHeader>
                          <DialogTitle>{userToEdit ? 'ویرایش کاربر' : 'افزودن کاربر جدید'}</DialogTitle>
                          <DialogDescription>
                            {userToEdit ? 'اطلاعات کاربر را ویرایش کنید.' : 'اطلاعات کاربر جدید را وارد کنید.'}
                          </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">نام</Label>
                              <Input id="name" name="name" defaultValue={userToEdit?.name || ''} className="col-span-3" required />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="email" className="text-right">ایمیل</Label>
                              <Input id="email" name="email" type="email" defaultValue={userToEdit?.email || ''} className="col-span-3" required />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="role" className="text-right">نقش</Label>
                              <Select name="role" defaultValue={userToEdit?.role || 'مشترک'} required>
                                  <SelectTrigger className="col-span-3">
                                      <SelectValue placeholder="یک نقش انتخاب کنید" />
                                  </SelectTrigger>
                                  <SelectContent>
                                      <SelectItem value="مدیر کل">مدیر کل</SelectItem>
                                      <SelectItem value="نویسنده">نویسنده</SelectItem>
                                      <SelectItem value="ویرایشگر">ویرایشگر</SelectItem>
                                      <SelectItem value="مشترک">مشترک</SelectItem>
                                  </SelectContent>
                              </Select>
                          </div>
                      </div>
                      <DialogFooter>
                          <DialogClose asChild>
                              <Button type="button" variant="secondary">لغو</Button>
                          </DialogClose>
                          <Button type="submit">ذخیره</Button>
                      </DialogFooter>
                  </form>
              </DialogContent>
          </Dialog>
        
        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
              <AlertDialogContent dir="rtl" className="font-persian">
                  <AlertDialogHeader>
                      <AlertDialogTitle>آیا از حذف کاربر مطمئن هستید؟</AlertDialogTitle>
                      <AlertDialogDescription>
                          این عمل قابل بازگشت نیست. با این کار کاربر <span className="font-bold">{userToDelete?.name}</span> برای همیشه حذف خواهد شد.
                      </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                      <AlertDialogCancel>لغو</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteUser} className="bg-destructive hover:bg-destructive/90">
                          بله، حذف کن
                      </AlertDialogAction>
                  </AlertDialogFooter>
              </AlertDialogContent>
          </AlertDialog>
      </div>
    </ProtectedRoute>
  );
}
