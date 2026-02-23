import { Box, Typography, Avatar } from '@mui/material';
import { SystemStyleObject, Theme } from '@mui/system';

import { Card } from '@components/atoms';
import { IContact } from 'react-coding-interview-shared/models';
import { useState } from 'react';

export interface IContactCardProps {
  person: IContact;
  sx?: SystemStyleObject<Theme>;
}

export const ContactCard: React.FC<IContactCardProps> = ({
  person: { name, email },
  sx,
}) => {
  const [nameChanged, setNameChanged] = useState(name);
  //{ value: name, validate: (v) => v.length > 0 }
  const [emailChanged, setEmailChanged] = useState(email);

  return (
    <Card sx={sx}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar />
        <Box textAlign="center" mt={2}>
          <EditableTypography initialValue={nameChanged} onChange={setNameChanged} />
          <EditableTypography initialValue={emailChanged} onChange={setEmailChanged} />
        </Box>
      </Box>
    </Card>
  );
};

const EditableTypography = ({initialValue, onChange}: {initialValue: string, onChange: (value: string) => void}) => {
  const [editable, setEditable] = useState(false);
  const [value, setValue] = useState(initialValue);
  
  const save = () => {
    setEditable(false);
    onChange(value);
  } 

  const cancel = () => {
    setEditable(false);
    setValue(initialValue);
  }

  return (
    <Box>
      {editable ? (
        <>
          <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
          <div><button onClick={save}>Save</button><button onClick={cancel}>Cancel</button></div>
        </>
      ) : <Typography onClick={() => setEditable(true)}>{value}</Typography>}
    </Box>
  );
}

